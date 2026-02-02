import Image from "next/image";
import FileSearch from "../../../../public/svg/file-search.svg";

export default function EmptyProduct() {
  return (
    <section className="flex flex-wrap items-start justify-center gap-5">
      <div className="space-y-10 text-center">
        <Image
          src={FileSearch}
          alt="file-search"
          className="drop-shadow-xl"
          width={400}
          height={400}
        />
        <div className="">
          <h4 className="text-2xl font-bold">No Data Found</h4>
          <h2 className="text-xl font-bold">
            There is no data to show you right now.
          </h2>
        </div>
      </div>
    </section>
  );
}
