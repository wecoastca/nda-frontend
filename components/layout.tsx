import { Content, ContentProps } from './content';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = ({
  children,
  contentProps,
  layoutContainerProps,
  ExtraHeaderComponent,
}: {
  children: any;
  contentProps?: ContentProps;
  layoutContainerProps?: React.ComponentProps<'div'>;
  ExtraHeaderComponent?: React.ElementType;
}) => {
  return (
    <div
      className="flex flex-col h-screen"
      style={{ minHeight: '-webkit-fill-available' }}
      {...layoutContainerProps}
    >
      <Header ExtraComponent={ExtraHeaderComponent} />
      <Content {...contentProps}>{children}</Content>
      <Footer />
    </div>
  );
};
