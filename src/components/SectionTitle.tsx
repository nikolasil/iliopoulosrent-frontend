import { Divider, Typography } from '@mui/material';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
    </>
  );
};

export default SectionTitle;
