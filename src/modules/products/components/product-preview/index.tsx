import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import InteractiveLink from "@modules/common/components/interactive-link"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <div className="w-72 bg-white shadow-md border rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="group"
      >
        {/* <div data-testid="product-wrapper"> */}
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
      </LocalizedClientLink>

      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 capitalize text-xs">brand</span>
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="group"
        >
          <Text
            className="text-sm font-bold text-black truncate block capitalize"
            data-testid="product-title"
          >
            {product.title}
          </Text>
        </LocalizedClientLink>
        <div className="flex jusitfy-center gap-x-2">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
      </div>
      <div className="px-2 pb-3 mt-2">
        <InteractiveLink href={`/products/${product.handle}`}>
          Quick View
        </InteractiveLink>
      </div>
      {/* </div> */}
    </div>
  )
}
