import Image from 'next/image';
import Head from 'next/head';
interface ImageComponentProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  loading?: 'lazy' | 'eager';
  quality?: number; // Added: compresses image quality
  blurDataURL?: string;
  cdn?: boolean;
  onClick?: () => void
  
}

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  quality = 75,
  sizes = '100vw',
  placeholder = 'empty',
  cdn = true,
  blurDataURL,
  onClick
}: ImageComponentProps) => {
  const imageUrl = cdn ? `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/images/${src}` : `/images/${src}`;
  return (
    <>
    {priority && (
        <Head>
          <link rel="preload" as="image" href={imageUrl} imagesrcset={imageUrl} />
        </Head>
      )}
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : loading}
      quality={quality}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
      onClick={onClick} 
    />
    </>
  );
};

export default ImageComponent;
