class UserTokenDto {
	id: string;
	nationalId: string;
	type: string;
	tokenCreatedAt: Date;
	tokenExpireAt: Date;

	constructor(
		id: string,
		nationalId: string,
		type: string,
		tokenCreatedAt: Date,
		tokenExpireAt: Date
	) {
		this.id = id;
		this.nationalId = nationalId;
		this.type = type;
		this.tokenCreatedAt = tokenCreatedAt;
		this.tokenExpireAt = tokenExpireAt;
	}

	export(): {
		id: string;
		nationalId: string;
		type: string;
		tokenCreatedAt: Date;
		tokenExpireAt: Date;
	} {
		return {
			id: this.id,
			nationalId: this.nationalId,
			type: this.type,
			tokenCreatedAt: this.tokenCreatedAt,
			tokenExpireAt: this.tokenExpireAt,
		};
	}
}

export default UserTokenDto;