import {createClient} from "@supabase/supabase-js";
import Image from "next/image";
import {useState} from "react";

export async function getStaticProps() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || " ",
    process.env.SUPABASE_SEERVICE_ROLE_KEY || " "
  );

  const data = await client.from("Photos").select("*").order("id");

  console.log(data);

  return {
    props: {photos: data.data},
  };
}

type Photo = {
  id: number;
  href: string;
  name: string;
  userName: string;
  src: string;
};

const PhotoContainer = ({photo}: {photo: Photo}) => {
  const [isLoading, setLoading] = useState(true);

  const imageState = isLoading
    ? "grayScale blur-2xl scale-110"
    : "grayScale-0 blur-0 scale-100";

  return (
    <a href={photo.href} className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={photo.src}
          alt="placeholder"
          layout="fill"
          objectFit="cover"
          className={
            "group-hover:opacity-75 duration-700 ease-in-out" + " " + imageState
          }
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{photo.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{photo.userName}</p>
    </a>
  );
};

const Gallery = ({photos}: {photos: Photo[]}) => {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:grid-gap-x-8 ">
        {photos.map((photo) => (
          <PhotoContainer key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
