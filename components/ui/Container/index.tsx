import Head from "next/head";

export interface ContainerProps {
  title: string;
  label?: string;
  required?: boolean;
  minimizedLabel?: boolean;
  description?: string;
  error?: string;
  wrapperStyle?: React.CSSProperties;
  children?: JSX.Element|JSX.Element[];
}

// type ContainerProps = {
//   title: string;
//   // children: React.ReactNode;
//   children: React.ReactNode

// };

export default function Container({ title, children }: ContainerProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Nextjs Dashboard Layout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
