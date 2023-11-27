import React, { useState } from 'react';

import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function Categories(props) {
  var docs = props.docs;
  return (
    <div>
      <List component="li" aria-labelledby="nested-list-subheader">
        {docs.map((doc) => {
          var color = doc.Id % docs.length;
          return (
            <CustomizedListItem
              key={doc.Id}
              doc={doc}
              color={color === 1 ? true : false}
            />
          );
        })}
      </List>
    </div>
  );
}

function CustomizedListItem(props) {
  const doc = props.doc;
  const color = props.color;
  const [open, setOpen] = useState(
    doc.DocsOpened != null ? doc.DocsOpened : false
  );

  function handleClick() {
    console.log('Handle Clicked....');
    setOpen((prevState) => !prevState);
  }

  return (
    <div class={color ? 'color2' : 'color1'}>
      <ListItem button key={doc.Id} onClick={handleClick}>
        <ListItemText
          className="text"
          disableRipple
          primary={doc.Id + '. ' + doc.Name}
          secondary={doc.Desc}
        />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse key={doc.Docs.Id} in={open} timeout="auto" unmountOnExit>
        <List className={'list'} component="li" disablePadding key={doc.Id}>
          {doc.Docs.map((docInner) => {
            return (
              <ListItem disableRipple button key={docInner.Id}>
                {docInner.Docs != null ? (
                  <CustomizedListItem
                    key={docInner.Id}
                    doc={docInner}
                    color={!color}
                  />
                ) : (
                  <ListItemText
                    className="text"
                    key={docInner.Id}
                    primary={docInner.Id + '. ' + docInner.Name}
                    secondary={docInner.Desc}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </div>
  );
}
