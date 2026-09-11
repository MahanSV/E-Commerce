class RedisDataModel<T = unknown> {
  private _data!: T;

  private _creationDateTime!: Date;

  private _specification!: string;

  static create<T>(data: T, specification: string): RedisDataModel<T> {
    if (!specification)
    // @TODO : fix error types
    { throw new Error('مشخصه اطلاعات باید پر باشد'); }

    const dataModel = new RedisDataModel<T>();

    dataModel._creationDateTime = new Date();
    dataModel._specification = specification;
    dataModel.data = data;

    return dataModel;
  }

  static createFromJson<T>(jsonDataModel: string): RedisDataModel<T> {
    const dataModel = JSON.parse(jsonDataModel);

    if (!dataModel?._specification || !dataModel?._data || !dataModel?._creationDateTime)
    // @TODO : fix error types
    { throw new Error('دیتای اولیه برای ساختن شیئ مدل ردیس کامل نمیباشد'); }

    const redisDateModel = new RedisDataModel<T>();
    redisDateModel._data = dataModel._data;
    redisDateModel._specification = dataModel._specification;
    redisDateModel._creationDateTime = dataModel._creationDateTime;

    return redisDateModel;
  }

  get data(): T {
    return this._data;
  }

  set data(value: T) {
    if (!value)
    // @TODO : fix error types
    { throw new Error('اطلاعات ثبتی نمیتواند خالی باشد '); }

    this._data = value;
  }

  get creationDateTime(): Date {
    return this._creationDateTime;
  }

  get specification(): string {
    return this._specification;
  }

  exportJson(): string {
    return JSON.stringify({
      _data: this.data,
      _specification: this.specification,
      _creationDateTime: this.creationDateTime,
    });
  }
}

export default RedisDataModel;
