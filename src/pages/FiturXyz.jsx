import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Card from "@/components/DataDisplayComponents/Card";
import Badge from "@/components/BasicComponents/Badge";

export default function FiturXyz() {
  return (
    <div className="p-4 animate-fade-in">
      <PageHeader title="Fitur XYZ" breadcrumb={["Fitur XYZ", "List"]} />
      <p>Ini Adalah Halaman Fitur XYZ</p>

      <Button variant="outline">Batal</Button>
      <Button variant="ghost">Batal</Button>
      <Button variant="destructive">Batal</Button>
      <Card className="mt-4 w-[380px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Belajar shadcn/ui</CardTitle>
            <Badge variant="secondary">Baru</Badge>
          </div>
          <CardDescription>
            Contoh penggunaan komponen shadcn/ui di React
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Komponen ini dibuat di branch <strong>setup-shadcn</strong>
            lalu di-merge ke main.
          </p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button>Simpan</Button>
          <Button variant="outline">Batal</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
