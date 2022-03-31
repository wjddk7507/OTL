import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

// 이미지 스타일
const ImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

const CardStyle = styled(Card)({
  borderRadius : 8,
  "&:hover":{
    boxShadow: '2px 5px 5px 2px rgba(225, 223, 214, 1)'
  }
});

const ItemsCard = ({ product }) => {
  const { token_id, item_title, on_use_yn, src } = product;

  // useEffect(()=>{
  //   console.log(product);
  //   console.log(JSON.parse(JSON.stringify(product)));
  // },[]);

  return (
    <CardStyle>
      {on_use_yn === 1&&(<Chip
      label="in use"
      color="error"
      icon={<CheckCircleIcon />}
    />)}
    
      <Link
          to={`/items/detail/${token_id}`}
          color="inherit"
          underline='hover'
          component={RouterLink}
        >
        <Box sx={{ pt: '100%', position: 'relative'}}>
          <ImgStyle src={src} />
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" noWrap>
              {item_title}
            </Typography>
        </Stack>

      </Link>
    </CardStyle>
  );
}

export default ItemsCard;
