import type { Route } from "next";
import Link from "next/link";

type SmartLinkProps = Omit<React.ComponentProps<"a">, "href"> & {
  href: string;
  prefetch?: boolean;
};

function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export function SmartLink({
  href,
  prefetch,
  ...props
}: SmartLinkProps) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
        {...props}
      />
    );
  }

  return <Link href={href as Route} prefetch={prefetch} {...props} />;
}
