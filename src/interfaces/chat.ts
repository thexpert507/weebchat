export interface Chat {
	id: string;
	from: string;
	to: string;
	message: string;
	sendedAt: Date;
	status?: 'on_quew' | 'viewed';
}
