function isExpiredTime(realDateTime: string, difference: number): boolean {
	return (new Date()).getSeconds() - (new Date(realDateTime)).getSeconds() > difference
}

export {
	isExpiredTime
}