import { ItemProps } from "../Item/Item";

export default interface DocumentProps extends ItemProps{
	Title:string;
	Symbols:string[]
	Sectors:string[];
	Source:string;
	ContentType:string;
	Type:string;
	PostedDate:Date;
}