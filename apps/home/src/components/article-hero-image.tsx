import { defaultShareImage } from '../lib/seo';

export default function ArticleHeroImage({ alt }: { alt: string }) {
  return <figure className="approval-hero-image"><img src={defaultShareImage} alt={alt} /><figcaption>관계와 마음을 이해하기 위한 이야기</figcaption></figure>;
}
