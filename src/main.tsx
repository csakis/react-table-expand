import React, { HTMLAttributes, HTMLProps } from "react";
import ReactDOM from "react-dom/client";

import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import MyTable from "./table";
import InnerTable from "./inner";

function App() {
  type Person = {
    id: number;
    client: string;
    payMethod: "Bancolombia" | "Efectivo" | "Nequi";
    orderStatus: "Pendiente" | "Preparando" | "Enviado" | "Entregado";
    paymentStatus: "Completo" | "Pendiente";
    referral: string;
    createdAt: Date;
    subRows?: Item[];
  };

  type Item = {
    product: "Higado" | "Manzana" | "Mani";
    type: "Galleta" | "Premio";
    weight: "25gr" | "50gr" | "500gr";
    status: "Pendiente" | "Listo";
  };

  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorKey: "id",
        id: "id",
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <>
              <button
                {...{
                  onClick: () => row.toggleExpanded(!row.getIsExpanded()),
                  style: { cursor: "pointer" },
                }}
              >
                {row.getIsExpanded() ? "-" : "+"}
              </button>

              {getValue()}
            </>
          </div>
        ),
        header: () => <span>Id</span>,
        size: 50,
      },
      {
        accessorKey: "client",
        id: "client",
        cell: (info) => info.getValue(),
        header: () => <span>Cliente</span>,
      },
      {
        accessorKey: "payMethod",
        id: "payMethod",
        cell: (info) => info.getValue(),
        header: () => <span>Metodo de pago</span>,
      },
      {
        accessorKey: "orderStatus",
        id: "orderStatus",
        cell: (info) => info.getValue(),
        header: () => <span>Estado del pedido</span>,
        size: 130,
      },
      {
        accessorKey: "paymentStatus",
        id: "paymentStatus",
        cell: (info) => info.getValue(),
        header: () => <span>Estado del pago</span>,
        size: 120,
      },
      {
        accessorKey: "referral",
        id: "referral",
        cell: (info) => info.getValue(),
        header: () => <span>Referido</span>,
      },
      {
        accessorKey: "createdAt",
        id: "createdAt",
        cell: (info) => info.getValue().toLocaleString(),
        header: () => <span>Fecha de creacion</span>,
      },
    ],
    [],
  );

  const data: Person[] = [
    {
      id: 1,
      client: "Juan Solano",
      payMethod: "Bancolombia",
      orderStatus: "Pendiente",
      paymentStatus: "Pendiente",
      referral: "El mejor can",
      createdAt: new Date(),
      subRows: [
        {
          product: "Higado",
          type: "Galleta",
          weight: "25gr",
          status: "Pendiente",
        },
      ],
    },
    {
      id: 2,
      client: "Juan Solano",
      payMethod: "Bancolombia",
      orderStatus: "Pendiente",
      paymentStatus: "Pendiente",
      referral: "El mejor can",
      createdAt: new Date(),
      subRows: [],
    },
    {
      id: 3,
      client: "Juan Solano",
      payMethod: "Bancolombia",
      orderStatus: "Pendiente",
      paymentStatus: "Pendiente",
      referral: "El mejor can",
      createdAt: new Date(),
      subRows: [],
    },
  ];
  return <InnerTable innerColumns={columns} innerData={data} />;
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
