import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Topbar from "./topBar"
import { getCategoriesList } from "@lib/data/categories"
import { clx } from "@medusajs/ui"
import { IoMdPerson } from "react-icons/io"
import { IoCartOutline } from "react-icons/io5"
import SearchModal from "@modules/search/templates/search-modal"
import { CiSearch } from "react-icons/ci";
export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const { product_categories } = await getCategoriesList(0, 100)
  console.log(product_categories)
  return (
    <>
      <Topbar />
      <div className="sticky top-0 inset-x-0 z-50 group">
        <header className="flex flex-col items-center mx-auto border-b duration-200 bg-white border-ui-border-base">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-[60px] text-small-regular">
            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                <h1>Egala Spot</h1>
              </LocalizedClientLink>
            </div>
            <div className="hidden md:flex items-center h-full mx-auto w-[60%] justify-center">
              <SearchModal />
            </div>
            <div className="flex items-center gap-x-6 h-full justify-end">
              <div className="hidden small:flex flex-col items-center justify-center gap-x-6 h-full">
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  <IoMdPerson size={24} />
                </LocalizedClientLink>
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>
              </div>
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                    <LocalizedClientLink
                      className="hover:text-ui-fg-base md:hidden flex flex-col justify-center items-center"
                      href="/search"
                      scroll={false}
                      data-testid="nav-search-link"
                    >
                     <CiSearch size={24} />
                      Search
                    </LocalizedClientLink>
                  )}
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <IoCartOutline size={24} />
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
              <SideMenu regions={regions} />
            </div>
            {/* <div className="flex-1 md:hidden basis-0 h-full flex items-center">
              <div className="h-full">
              </div>
            </div> */}
          </nav>
          <div className="hidden md:flex justify-center items-center h-[40px] w-full">
            <CategoryMenu product_categories={product_categories} />
          </div>
        </header>
      </div>
    </>
  )
}
const CategoryMenu = ({ product_categories }) => {
  const parentCategories = product_categories.filter(
    (category) => category.parent_category_id === null
  )
  return (
    parentCategories &&
    parentCategories.length > 0 && (
      <div className="flex flex-col gap-y-2">
        <ul
          className={clx(
            "flex flex-col md:flex-row gap-6 text-md font-light capitalize",
            {
              "grid-cols-2": (product_categories?.length || 0) > 3,
            }
          )}
        >
          {parentCategories.map((category) => (
            <li key={category.id} className="relative group">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href={`/categories/${category.handle}`}
              >
                {category.name}
              </LocalizedClientLink>
              {category.category_children.length > 0 && (
                <ul className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-md z-10">
                  {category.category_children.map((child) => (
                    <li key={child.id} className="px-4 py-2 hover:bg-gray-100">
                      <LocalizedClientLink
                        className="block w-full text-left"
                        href={`/categories/${child.handle}`}
                      >
                        {child.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
