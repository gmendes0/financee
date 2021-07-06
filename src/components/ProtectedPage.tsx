import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";

type ProtectedPageProps = {
  children: React.ReactNode;
};

export default function ProtectedPage(props: ProtectedPageProps): JSX.Element {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user, router]);

  if (!user)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
      >
        <Typography variant="body1">Não autorizado...</Typography>
      </Box>
    );

  return <>{props.children}</>;
}
