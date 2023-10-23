import { DocCard } from '@/components/cards/DocCard';
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { handleOpenEditModal } from '@/reducers/ModalReducer';
import { useAppDispatch } from '@/hooks/useRedux';
import AddLink from './AddLink';

interface Props {
  links: string[];
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
}

const LinksTab = ({ links, setLinks }: Props) => {
  const dispatch = useAppDispatch();

  function handleDeleteFile(title: string) {
    const newLinks = links.filter((link) => link !== title);
    setLinks(newLinks);
  }

  const handleAddLink = () => {
    dispatch(handleOpenEditModal());
  };

  return (
    <Box>
      <div className="block docs-block">
        <div className="row">
          {links.map((link) => {
            return (
              <DocCard
                badgeLabel="new"
                title={link}
                description=""
                to={link}
                icon={'link'}
                handleDeleteFile={handleDeleteFile}
              />
            );
          })}
          <div className="item col-6 col-md-4 col-lg-3">
            <Box
              onClick={handleAddLink}
              sx={{ cursor: 'pointer' }}
              bgcolor="#61b3ea"
              height="16rem"
              borderRadius="1rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <AddCircleOutlineIcon htmlColor="white" fontSize="large" />
              <Typography variant="body1" color="white">
                Agregar enlace
              </Typography>
            </Box>
          </div>
        </div>
      </div>
      <AddLink links={links} setLinks={setLinks} />
    </Box>
  );
};

export default LinksTab;
