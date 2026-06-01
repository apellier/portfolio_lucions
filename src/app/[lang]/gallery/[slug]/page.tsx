import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import PhotoViewer from "@/components/PhotoViewer/PhotoViewer";
import Footer from "@/components/Footer/Footer";
import {
  getAllPhotos,
  getPhotoBySlug,
  getAdjacentPhotos,
} from "@/lib/photos";
import { getDictionary, Locale } from "@/lib/dictionaries";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const photos = getAllPhotos();
  const locales = ["fr", "en"];
  return locales.flatMap((lang) =>
    photos.map((photo) => ({
      lang,
      slug: photo.slug,
    }))
  );
}


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);
  if (!photo) return {};

  return {
    title: photo.title,
    description: photo.description || `${photo.title} — Lucions Photography`,
    openGraph: {
      title: `${photo.title} | Lucions`,
      description: photo.description || `${photo.title} — Lucions Photography`,
      images: [
        {
          url: photo.src,
          width: photo.width,
          height: photo.height,
          alt: photo.title,
        },
      ],
    },
  };
}

export default async function PhotoDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const photo = getPhotoBySlug(slug);

  if (!photo) {
    notFound();
  }

  const { prev, next } = getAdjacentPhotos(slug);
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Header lang={lang} dict={dict.nav} />
      <main style={{ paddingTop: "var(--header-height)" }}>
        <PhotoViewer
          photo={photo}
          prevPhoto={prev}
          nextPhoto={next}
          lang={lang}
          dict={dict.gallery}
        />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
