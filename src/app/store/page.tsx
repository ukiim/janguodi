import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products, STORE_BASE } from "@/data/products";
import { ShoppingBag, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "스토어",
  description:
    "체험 농장에서 직접 재배한 농산물과 체험 키트를 네이버 스토어에서 만나보세요.",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

export default function StorePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <ShoppingBag className="h-3.5 w-3.5 mr-1" />
            네이버 스마트스토어
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">스토어</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            체험 농장에서 직접 재배한 농산물과 체험 키트를 만나보세요.
            <br />
            클릭하면 네이버 스마트스토어로 이동합니다.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative aspect-square bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 text-xs z-10">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}원
                      </span>
                      <span
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "text-xs"
                        )}
                      >
                        구매하기
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Store CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            더 많은 상품이 궁금하신가요?
          </h2>
          <p className="text-muted-foreground mb-6">
            네이버 스마트스토어에서 전체 상품을 확인하세요
          </p>
          <a
            href={STORE_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            스마트스토어 방문하기
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
