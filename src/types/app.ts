
export interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export interface UnsplashImage {
  id: string
  urls: { regular: string }
  alt_description: string
}
