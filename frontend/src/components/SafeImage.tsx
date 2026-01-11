import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  onError?: () => void;
}

export default function SafeImage({ 
  src, 
  alt, 
  width, 
  height, 
  fill, 
  className,
  priority,
  onError 
}: SafeImageProps) {
  // Check if it's a Supabase URL
  const isSupabaseUrl = src?.includes('supabase.co');
  
  // For Supabase URLs with private IP issues, use unoptimized
  if (isSupabaseUrl) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={onError}
        loading={priority ? 'eager' : 'lazy'}
        style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
      />
    );
  }

  // For other images, use Next.js Image optimization
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 0}
      height={height || 0}
      fill={fill}
      className={className}
      priority={priority}
      onError={onError}
    />
  );
}
