module.exports = (client) => {
  console.log('Bot shutting down.')
  setTimeout(() => {
    if (client) client.destroy();
    setTimeout(() => {
      process.exit();
    }, 2000);
  }, 50);
}