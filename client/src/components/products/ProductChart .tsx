import type { Product } from "@/types/productType";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ProductChartProps {
  data: Product[];
}

const ProductChart = ({ data }: ProductChartProps) => {
  const monthMap: { [month: string]: number } = {};
  // {["Oct 12"] : 16, ["Sep 15"] : 12}

  for (const product of data) {
    const month = new Date(product.createdAt).toLocaleString("default", {
      day: "2-digit",
      month: "short",
    });

    if (!monthMap[month]) monthMap[month] = 0; // {["Oct 16"] : 0}
    monthMap[month]++;
  }

  const chartData = Object.entries(monthMap).map(([month, count]) => ({
    month,
    count,
  })); // [{month: "Oct 16", count: 16}, {month: "Sep 15", count: 12}]

  const chartConfig = {
    date: {
      label: "Date",
      color: "#000000",
    },
    count: {
      label: "Count",
      color: "#000000",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Added per Month</CardTitle>
        <CardDescription>
          See your product instock flow with fancy chart
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <AreaChart data={chartData} accessibilityLayer>
            <XAxis dataKey={"month"} />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <CartesianGrid vertical={false} />
            <Area
              dataKey={"count"}
              type={"linear"}
              fill="#60a5fa"
              stroke="#2563eb"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProductChart;
