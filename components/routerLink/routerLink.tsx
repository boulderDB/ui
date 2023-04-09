import { PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "classix";
import styles from "./routerLink.module.css"
import { useAppContext } from "../../pages/_app";

type RouterLinkProps = {
  href: string;
  prefixLocation?: boolean;
  className: string;
};

export function RouterLink({
  href,
  className,
  children,
  prefixLocation = false,
}: PropsWithChildren<RouterLinkProps>) {
  const { asPath } = useRouter();
  const { currentLocation } = useAppContext();

  const target =
    prefixLocation && currentLocation ? `/${currentLocation.url}${href}` : href;

  return (
    <Link
      href={target}
      className={cx(className,asPath === target ? styles.isActive:null)}
    >
      {children}
    </Link>
  );
}
