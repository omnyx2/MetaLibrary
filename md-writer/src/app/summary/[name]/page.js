export const dynamicParams = false;

export function generateStaticParams() {
  let slugs = ['history', 'user-manual', 'a', '4', '5', '6'];
  return slugs.map((slug) => ({ name: slug }));
}

export default function PhotoPage({
  params: { name: name },
}) {
  console.log("modal page open")
  return <div className="card">{name}</div>;
}