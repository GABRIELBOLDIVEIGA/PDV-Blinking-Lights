import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVendasPorDia } from "@/hooks/queries/vendas/useVendas.query";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IProps {
  className?: string;
}

export const CardVendasPeriodo = ({ className }: IProps) => {
  const vendasPorDia = useVendasPorDia();

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-sm">VENDAS NO PERÍODO</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart height={300} data={vendasPorDia} barCategoryGap={5}>
            <defs>
              <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset={"0"} stopColor="#10b981" stopOpacity={"1"} />
                <stop offset={"1"} stopColor="#10b981" stopOpacity={"0"} />
              </linearGradient>
              <linearGradient id="expanseBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset={"0"} stopColor="#ef4444" stopOpacity={"1"} />
                <stop offset={"1"} stopColor="#ef4444" stopOpacity={"0"} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="5 5"
              strokeOpacity={"0.2"}
              vertical={false}
            />
            <XAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 5, right: 5 }}
              dataKey={(data) => {
                const { day } = data;
                const date = new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  day || 1
                );

                return date.toLocaleDateString("default", {
                  day: "2-digit",
                });
              }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar
              dataKey={"qnt"}
              label="Income"
              fill="url(#incomeBar)"
              radius={4}
              className="cursor-pointer"
            />
            {/* <Bar
              dataKey={"expense"}
              label="Expense"
              fill="url(#expanseBar)"
              radius={4}
              className="cursor-pointer"
            /> */}
            <Tooltip
              cursor={{ opacity: 0.1 }}
              content={(props) => <CustomTooltip {...props} />}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  const { currentValue, setFinalValue } = useCountUp();

  useEffect(() => {
    if (!active || !payload || payload.length === 0) return;
    const data = payload[0].payload;
    const { qnt } = data;
    setFinalValue(qnt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      <TooltipRow
        label="Quantidade"
        qnt={currentValue}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
      />
    </div>
  );
}

function TooltipRow({
  label,
  qnt,
  bgColor,
  textColor,
}: {
  label: string;
  textColor: string;
  bgColor: string;
  qnt: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-4 w-4 rounded-full", bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("text-sm font-bold", textColor)}>
          {qnt.toFixed()}
        </div>
      </div>
    </div>
  );
}

export function GetFormatterForCurrency(currency: string) {
  const locale = Currencies.find((c) => c.value === currency)?.locale;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
  { value: "GBP", label: "£ Pound", locale: "en-GB" },
];

export type Currency = (typeof Currencies)[0];
