import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DocCard } from '@/components/cards/DocCard';
import { useRef } from 'react';

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FilesTab = ({ files, setFiles }: Props) => {
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;
    if (fileList) {
      const newFiles = Array.from(fileList);
      setFiles([...files, ...newFiles]);
    }
  }

  function getFileExtension(filename: string): string {
    const parts = filename.split('.');
    if (parts.length === 1) {
      return 'other';
    }
    return parts[parts.length - 1];
  }

  const inputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleDeleteFile(title: string) {
    const newFiles = files.filter((file) => file.name !== title);
    setFiles(newFiles);
  }
  return (
    <Box>
      <div className="block docs-block">
        <div className="row">
          {files.map((file) => {
            return (
              <DocCard
                badgeLabel="new"
                title={file.name}
                description=""
                to="#"
                // icon={getFileExtension(file.name)}
                icon={'other'}
                handleDeleteFile={handleDeleteFile}
              />
            );
          })}
          <div className="item col-6 col-md-4 col-lg-3">
            <Box
              onClick={handleButtonClick}
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
                Agregar archivo
              </Typography>
            </Box>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              multiple
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FilesTab;
