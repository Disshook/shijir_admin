export interface BannerModel {
  _id: string;
  big: string;
  little: string;
  file: string;
  fileType: "image" | "video";
  createdAt: string;
}
