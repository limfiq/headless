import Image from "next/image";

interface GalleryProps {
  thumbnailUrl: string;
}

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `http://localhost:1337${src}?w=${width}&q=${quality || 75}`;
};

const Gallery: React.FC<GalleryProps> = ({ thumbnailUrl }) => {
  return (
    <Image
      loader={imageLoader}
      src={thumbnailUrl}
      alt="Foto"
      width={250}
      height={200}
    />
  );
};

export default Gallery;
