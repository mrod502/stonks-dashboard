import DocumentProps from "../../Db/Document/DocumentProps";

export default interface ScraperProps {
  onScrape?:(val:DocumentProps[])=>void;
}