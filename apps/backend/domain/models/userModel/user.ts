import BaseModel from '#models/base/baseModel.ts';
import {compare, encrypt} from '#substructure/utils/encryption.ts';
import normalizePersianText from '#substructure/utils/normalizePersianText.ts';
import {
    DuplicatePasswordError, InvalidPasswordError,
    NullOrEmptyNationalIdError, NullOrEmptyTypeError,
} from '#models/userModel/errors/index.ts';
import validator from 'validator';


interface UserConstructorParams {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    nationalId: string;
    type: string;
    mobile?: string;
    gender?: string;
}

interface UserSnapshotParams {
    id: string;
    username: string | null;
    password: string | null;
    firstName: string | null;
    lastName: string | null;
    nationalId: string;
    type: string;
    mobile: string | null;
    gender: string | null;
    createdAt: Date;
}

class User extends BaseModel {
    private _username?: string;
    private _password?: string;
    private _firstName?: string;
    private _lastName?: string;
    private _nationalId!: string;
    private _type!: string;
    private _mobile?: string;
    private _gender?: string;
    private _createdAt?: Date;

    constructor() {
        super();
    };

    static create(command: UserConstructorParams) {

        const user = new User();

        if(command?.id){
            user.id = command?.id
        }

        user.username = command?.username;
        user.password = command?.password;
        user.firstName = normalizePersianText(command.firstName);
        user.lastName = normalizePersianText(command.lastName);
        user.nationalId = command.nationalId;
        user.type = command.type;
        user.mobile = command.mobile;
        user.gender = command.gender;

        return user;
    };

    static createFromSnapshot(snapshot: UserSnapshotParams) {
        const user = new User();

        user.id = snapshot.id;
        user.username = snapshot.username ?? undefined;
        user.password = snapshot.password ?? undefined;
        user.firstName = snapshot.firstName ?? undefined;
        user.lastName = snapshot.lastName ?? undefined;
        user.nationalId = snapshot.nationalId;
        user.type = snapshot.type;
        user.mobile = snapshot.mobile ?? undefined;
        user.gender = snapshot.gender ?? undefined;
        user.createdAt = snapshot.createdAt;

        return user;
    };


    get username(): string | undefined {
        return this._username;
    };
    set username(value: string | undefined) {
        this._username = value;
    };

    get password(): string | undefined {
        return this._password;
    };
    set password(value: string | undefined) {

        if (typeof value !== 'string' || value.trim() === '') {
            this._password = undefined;
            return;
        }

        this.validatePasswordStrength(value)

        if (this._password && compare(value,this._password)) {
            throw new DuplicatePasswordError();
        }

        this._password =encrypt(value);
    };


    get firstName(): string | undefined {
        return this._firstName;
    };
    set firstName(value: string | undefined) {
        this._firstName = value;
    };


    get lastName(): string | undefined {
        return this._lastName;
    };
    set lastName(value: string | undefined) {
        this._lastName = value;
    };


    get nationalId(): string {
        return this._nationalId;
    };
    set nationalId(value: string) {

        this.nullOrEmptyNationalIdValidation(value);

        this._nationalId = value;
    };


    get type(): string {
        return this._type;
    };
    set type(value: string) {

        this.nullOrEmptyTypeValidation(value);

        this._type =value;
    };


    get mobile(): string | undefined {
        return this._mobile;
    };
    set mobile(value: string | undefined) {
        this._mobile =value;
    };


    get gender(): string | undefined {
        return this._gender;
    };
    set gender(value: string | undefined) {
        this._gender =value;
    };


    get createdAt(): Date | undefined {
        return this._createdAt;
    };

    set createdAt(value: Date | undefined) {
        this._createdAt = value;
    };

    private nullOrEmptyTypeValidation(type: string): void{
        if (validator.isEmpty(type)) {
            throw new NullOrEmptyTypeError();
        }
    };

    private nullOrEmptyNationalIdValidation(nationalId: string): void {
        if (validator.isEmpty(nationalId)) {
            throw new NullOrEmptyNationalIdError();
        }
    };

    private validatePasswordStrength(password: string): void {
        const rules = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        };

        if (!validator.isStrongPassword(password, rules)) {
            throw new InvalidPasswordError(
              'رمز عبور ضعیف است. لطفاً از حروف بزرگ، کوچک، عدد و کاراکتر خاص استفاده کنید.',
              `Password "${password}" failed strength rules: ${JSON.stringify(rules)}`
            );
        }
    };
}

export default User;