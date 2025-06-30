interface SingleCategoryProps {
  id: number;
  imgPath: string;
  name: string;
}

export const SingleCategory = ({ id, imgPath, name }: SingleCategoryProps) => {
  return (
    <div id={id.toString()} className="flex flex-col items-center gap-3 cursor-pointer">
      <img src={imgPath} className="w-16" />
      <span className="text-lg font-semibold">{name}</span>
    </div>

  )
}
