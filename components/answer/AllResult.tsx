import { Doughnut } from "react-chartjs-2";

type Props = {
  correctNum: number;
  size: number;
  onClickRetry: () => void;
};

export default function AllResult(props: Props) {
  return (
    <div className="mt-5">
      <p className="font-semibold">総合結果</p>
      <div className="p-5 max-w-sm mx-auto">
        <Doughnut
          data={{
            labels: ["正解", "不正解"],
            datasets: [
              {
                label: "",
                data: [props.correctNum, props.size - props.correctNum],
                backgroundColor: ['rgb(255, 159, 64)', 'rgb(54, 162, 235)'],
              },
            ],
          }}
        />
        <p className="text-2xl text-center mt-5">
          正解率：{props.correctNum}/{props.size}
        </p>
      </div>
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
