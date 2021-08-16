type Props = {
  correctNum: number;
  size: number;
  onClickRetry: () => void;
};

export default function AllResult(props: Props) {
  return (
    <div className="mt-5">
      <p className="font-semibold">総合結果</p>
      <p className="text-xl mt-3">
        {props.correctNum}/{props.size}
      </p>
      <button
        className="block text-white bg-accent p-3 rounded-md w-full mt-5"
        onClick={() => {
          props.onClickRetry();
        }}
      >
        もう一度解く
      </button>
    </div>
  );
}
