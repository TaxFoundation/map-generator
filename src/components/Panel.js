import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const Panel = styled(Paper)`
  grid-row: span 1;
  overflow-y: auto;
`;

export const PanelTypography = styled(Typography)`
  display: block !important;
  margin: 0 auto !important;
  padding: 10px !important;
  width: 90%;
`;

export const PanelSection = styled.div`
  display: block !important;
  margin: 0 auto !important;
  padding: 10px !important;
  width: 90%;
`;
