/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Dialog,DialogContent,DialogTitle,IconButton,Typography,Box,FormControlLabel,Checkbox,TextField,Button} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'sonner';
import { postData } from '../../../../Services/Api';
import Loading from '../../../GlobalComponents/Loading/Loading';
  
const reasons = [
  { id: 1, label: 'Preço muito alto' },
  { id: 2, label: 'Descrição inadequada' },
  { id: 3, label: 'Fotos não condizem com a realidade' },
  { id: 4, label: 'Fotos inadequadas' },
  { id: 5, label: 'Foto repetidas' },
  { id: 6, label: 'Outro motivo' }
];
  
function RecuseDialog({ open, handleClose,propertyData,func }) {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [customReason, setCustomReason] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');


  const handleReasonChange = (reasonId) => {
    const updatedReasons = selectedReasons.includes(reasonId)
      ? selectedReasons.filter((id) => id !== reasonId)
      : [...selectedReasons, reasonId];
    setSelectedReasons(updatedReasons);
  };
  
  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };
  
  const handleSubmit = async () => {
    const selectedReasonLabels = selectedReasons.map(
      (reasonId) => reasons.find((reason) => reason.id === reasonId).label
    );
    let reasonsString = selectedReasonLabels.join(', ');
  
    console.log('Motivos selecionados:', reasonsString);
    if (selectedReasons.includes(6)) {
      reasonsString = reasonsString + ':' + customReason;
    }
    if(selectedReasons.length === 0) {
      toast.warning('Selecione pelo menos um motivo para recusar a publicação do imóvel');  
    }else if(selectedReasons.includes(6) && customReason === '') {
      toast.warning('Ao selecionar outro motivo, informe uma justificativa');
    }    
    else{
      try{
        setLoading(true);
        const response = await postData(`admin/property/deny/${propertyData.id}`,{'reason': customReason},token);
        if( response.status === 200){
          toast.success('Publicação recusada com sucesso');
          func();
        }else{
          toast.warning(response.message);
        }
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }
      handleClose();
    }
  
  };
  
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      {loading && <Loading data={{ open: loading }} />}

      <DialogTitle sx = {{color: '#fff', backgroundColor: '#092f46', fontSize: '1.2rem',display: 'flex',justifyContent: 'space-between',gap: '10px',marginBottom: '20px'}}>  
          Detalhes no anúncio
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#fff',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
            Selecione um ou mais motivos para recusar a publicação do imóvel:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          {reasons.map((reason) => (
            <FormControlLabel
              key={reason.id}
              control={
                <Checkbox
                  checked={selectedReasons.includes(reason.id)}
                  onChange={() => handleReasonChange(reason.id)}
                />
              }
              label={reason.label}
            />
          ))}
        </Box>
        {selectedReasons.includes(6) && (
          <TextField
            label="Outro motivo (opcional)"
            value={customReason}
            onChange={handleCustomReasonChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
          />
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2,fontSize: '12px',color: '#f5f5f5', backgroundColor: '#092f46' }}>
            Confirmar Recusa
        </Button>
      </DialogContent>
    </Dialog>
  );
}
  
export default RecuseDialog;
  
