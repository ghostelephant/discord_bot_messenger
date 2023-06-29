const router = require("express").Router();
// const path = require("path");

const messageRoutes = require("./message.routes");

router.use("/api/messages", messageRoutes);

router.use((_, res) => {
	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;