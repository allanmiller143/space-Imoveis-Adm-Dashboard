/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Input } from 'antd';
import ChatContext from '../../ChatContext/ChatContext';

const { Search } = Input;

const SearchWithIcon = ({ search, setSearch }) => {
  const { chats, setFilterChats, setChatsFilterActivated } = useContext(ChatContext);
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);

  const handleSearch = (searchValue) => {
    if (searchValue.trim() !== '') {
      setChatsFilterActivated(true);
      const filteredChats = chats.filter((chat) => {
        const user = chat.user1.email === currentUser.email ? chat.user2 : chat.user1;
        const userName = user.type !== 'realstate' ? user.name : user.company_name;
        return userName && userName.toLowerCase().includes(searchValue.trim().toLowerCase());
      });
      setFilterChats(filteredChats);
      console.log(filteredChats.length);
    } else {
      setChatsFilterActivated(false);
      setFilterChats([]);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === '') {
      setChatsFilterActivated(false);
      setFilterChats([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(search);
    }
  };

  return (
    <Search
      value={search}
      onChange={handleChange}
      placeholder="Pesquisar..."
      allowClear
      onSearch={handleSearch}
      onKeyDown={handleKeyDown}
      style={{
        width: '100%',
        borderRadius: 6,
      }}
    />
  );
};

export default SearchWithIcon;
