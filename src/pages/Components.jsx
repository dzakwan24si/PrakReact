import React from 'react';
import Button from '../components/BasicComponents/Button';
import Badge from '../components/BasicComponents/Badge';
import Avatar from '../components/BasicComponents/Avatar';
import Container from '../components/LayoutComponents/Container';
import Footer from '../components/LayoutComponents/Footer';
import Card from '../components/DataDisplayComponents/Card';
import ProductCard from '../components/DataDisplayComponents/ProductCard';
import Table from '../components/DataDisplayComponents/Table';
import PageHeader from '../components/PageHeader';

export default function Components() {
  // Data untuk Table
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  const products = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
  ];

  return (
    <div className="p-4 animate-fade-in">
      <PageHeader title="Components" breadcrumb={["Components List"]}>
            </PageHeader>

      {/* 1. Basic Component */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Basic Components</h2>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Button:</h3>
          <div className="flex gap-2">
            <Button type="primary">Primary</Button>
            <Button type="success">Simpan</Button>
            <Button type="danger">Hapus</Button>
            <Button type="warning">Edit</Button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Badge:</h3>
          <div className="flex gap-2">
            <Badge type="success">Aktif</Badge>
            <Badge type="warning">Pending</Badge>
            <Badge type="danger">Gagal</Badge>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Avatar:</h3>
          <div className="flex gap-2">
            <Avatar name="Dzakwan" />
            <Avatar name="Budi" />
            <Avatar name="Siti" />
          </div>
        </div>
      </section>

      {/* 2 & 3. Data Display Component & Layout */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Data Display & Layout Components</h2>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">Basic Card:</h3>
          <Card>
            <h2 className="text-xl font-bold">Judul Card</h2>
            <p className="text-gray-600">Ini adalah isi dari card komponen.</p>
          </Card>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Product Card:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProductCard
              image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              title="Sepatu Sport"
              category="Fashion"
              price="Rp 450.000"
              description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
              title="Smartphone"
              category="Elektronik"
              price="Rp 4.500.000"
              description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Table:</h3>
          <Table headers={headers}>
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border px-4 py-3">{index + 1}</td>
                <td className="border px-4 py-3">{product.name}</td>
                <td className="border px-4 py-3">
                  <Badge type="primary">{product.category}</Badge>
                </td>
                <td className="border px-4 py-3">{product.price}</td>
                <td className="border px-4 py-3">
                  <Button type="primary">Detail</Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </section>

      {/* Footer di dalam Playground */}
      <Footer />
    </div>
  );
}