import { postData } from '../../Services/Api';

export async function openNewChat(socket, email) {
  console.log(socket);
  const token = localStorage.getItem('token');
  try {
    const response = await postData(`chat/${email}`, {}, token);
    let chatId;
    if (response.status === 200 || response.status === 201) {
      chatId = response.data.id;
      localStorage.setItem('chatId', chatId);
    } else {
      console.log(`Deu ruim nesse carai ${response.message}`);

    }

    const data = {
      email: email,
      chatId: chatId
    };

    // eslint-disable-next-line no-unused-vars
    const list = await new Promise((resolve, reject) => {
      socket.emit('open_chat', data, (msg) => {
        resolve(msg);
      });
    });

    return list;

  } catch (error) {
    console.log(error);
  }
}
