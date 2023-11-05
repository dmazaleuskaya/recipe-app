import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>Dasha`s kitchen</p>
      <Link href="/recipes">Recipes</Link>
    </div>
  );
}
