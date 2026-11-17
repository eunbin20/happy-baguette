import Link from 'next/link';

const links = [
  ['MBTI별 찐사랑 특징', '/mbti/'], ['MBTI별 연애 궁합', '/mbti/compatibility/'], ['MBTI별 재회확률', '/mbti/reunion/'],
  ['내 연봉, 또래보다 높은 걸까?', '/posts/salary-by-age/'], ['남자들이 좋아하는 여자 키 순위', '/posts/womens-height-ranking/'],
  ['꿈해몽 전체 보기', '/dream/'], ['길몽과 흉몽을 현실에 활용하는 법', '/posts/use-dreams/'], ['교통사고 꿈 해몽', '/dream/traffic-accident/'],
  ['남자가 자연스럽게 반하게 되는 여자', '/posts/naturally-attractive-woman/'], ['남몰래 다들 좋아하는 사람 특징', '/posts/secretly-popular-person/'],
] as const;

export default function RelatedPosts({ currentPath, title = '이 글도 같이 봐요' }: { currentPath: string; title?: string }) {
  const available = links.filter(([, path]) => path !== currentPath);
  const start = [...currentPath].reduce((sum, char) => sum + char.charCodeAt(0), 0) % available.length;
  const items = [...available.slice(start), ...available.slice(0, start)].slice(0, 5);
  return <aside className="related-posts"><h2>{title}</h2>{items.map(([name, path]) => <Link href={path} key={path}><span>{name}</span><b>읽어보기 →</b></Link>)}</aside>;
}
