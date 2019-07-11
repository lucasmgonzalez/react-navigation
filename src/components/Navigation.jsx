import React from 'react';
import styled from 'styled-components';

import data from '../navData';

const navigationItems = data.navCatagories;

const NavigationContainer = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  
  background-color: white;
  
  list-style: none;
`;

const NavigationItem = styled.li`
  color: ${({active}) => active ? '#1A1A1A' : '#747474'};
`;

const NavigationLink = styled.a`
  display: inline-block;

  padding: 5px 15px 4px;

  font-family: "Helvetica Neue", Verdana, Arial, sans-serif;
  color: currentColor; 
  text-decoration: none;
  line-height: 24px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  display: ${({show}) => show ? 'flex' : 'none'};

  width: 100%;
  height: 250px;
  padding: 15px 25px;
  
  background-color: white;
`;

const ColumnMenu = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  height: 100%;
  padding: 0 10px;

  list-style: none;
`;

const ColumnHeader = styled.li`
  color: #222;
  text-decoration: ${({hasLink}) => hasLink ? 'underline' : 'none'};

  order: 0;
`;

const ColumnItem = styled.li`
  
  color: #222;

  order: 1;
`;

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = React.useState(null);
  
  const handleMouseOver = ({currentTarget}) => {
    setHoveredItem(currentTarget.getAttribute('data-navigation-id'));
  };

  const handleMouseOut = () => {
    setHoveredItem(null);
  };

  return (
    <NavigationContainer>
      {navigationItems.map(item => item.is_active && (
        <NavigationItem
          key={item.id} 
          data-navigation-id={item.id} 
          active={!hoveredItem || Number.parseInt(hoveredItem) === item.id}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <NavigationLink href={'/' + item.url_path}>
            {item.name}
          </NavigationLink>
          {item.children_data && (
            <DropdownMenu 
              show={Number.parseInt(hoveredItem) === item.id}
            >
              <ColumnMenu>
                {item.children_data
                  .filter(child => !child.include_in_menu_column2 && !child.include_in_menu_column3 )
                  .map(child => child.is_column_header ? (
                    <ColumnHeader>
                      <a href={child.url_path && `/${child.url_path}`}>
                        {child.name.indexOf('-') !== -1 ? child.name.split('-')[1].trim() : child.name}
                      </a>
                    </ColumnHeader>
                  ) : (
                    <ColumnItem>
                      <a href={`/${child.url_path}`}>
                        {child.name}
                      </a>
                    </ColumnItem>
                  ))}
              </ColumnMenu>
              
              <ColumnMenu>
                {item.children_data
                  .filter(child => child.include_in_menu_column2 )
                  .map(child => child.is_column_header ? (
                    <ColumnHeader hasLink={!!child.url_path}>
                      <a href={`/${child.url_path}`}>
                        {child.name.indexOf('-') !== -1 ? child.name.split('-')[1].trim() : child.name}
                      </a>
                    </ColumnHeader>
                  ) : (
                    <ColumnItem>
                      <a href={`/${child.url_path}`}>
                        {child.name}
                      </a>
                    </ColumnItem>
                  ))}
              </ColumnMenu>
              
              <ColumnMenu>
                {item.children_data
                  .filter(child => child.include_in_menu_column3 )
                  .map(child => child.is_column_header ? (
                    <ColumnHeader>
                      <a href={`/${child.url_path}`}>
                        {child.name.indexOf('-') !== -1 ? child.name.split('-')[1].trim() : child.name}
                      </a>
                    </ColumnHeader>
                  ) : (
                    <ColumnItem>
                      <a href={`/${child.url_path}`}>
                        {child.name}
                      </a>
                    </ColumnItem>
                  ))}
              </ColumnMenu>
            </DropdownMenu>
          )}
        </NavigationItem>
      ))}
    </NavigationContainer>
  );
};

export default Navigation;
