import React, { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

type WithLoggedRedirectProps = {};

const withLoggedRedirect: <P extends WithLoggedRedirectProps>(
  // eslint-disable-next-line no-unused-vars
  WrappedComponent: ComponentType<P>
) => React.FC<P> = function withLoggedRedirect<P extends WithLoggedRedirectProps>(
  WrappedComponent: ComponentType<P>,
): React.FC<P> {
  const ComponentWithRedirect: React.FC<P> = function ComponentWithRedirect(props) {
    const router = useRouter();
    const { isLogged } = useAuth();

    useEffect(() => {
      if (isLogged) {
        router.push('/');
      }
    }, [isLogged, router]);

    return <WrappedComponent {...props} />;
  };

  ComponentWithRedirect.displayName = `withLoggedRedirect(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithRedirect;
};

export default withLoggedRedirect;
