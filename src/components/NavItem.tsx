import { makeStyles, Typography, Link } from "@material-ui/core";
import NextLink from "next/link";

type NavItemPropsType = {
  link: string;
};

const useStyles = makeStyles({
  navItem: {
    padding: "0 20px",
  },
});

const NavItem: React.FC<NavItemPropsType> = ({ link, children }) => {
  const classes = useStyles();

  return (
    <Typography component="p" variant="body2" className={classes.navItem}>
      <NextLink href={link}>
        <Link href={link}>{children}</Link>
      </NextLink>
    </Typography>
  );
};

export default NavItem;
