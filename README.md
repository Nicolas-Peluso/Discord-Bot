# Discord Bot
 um bot para usar em salas de chat no aplicativo discord

<section style="
    max-width: 850px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: auto;
    font-family: sans-serif, 'Courier New', Courier, monospace;
    font-size: 1.1em;
">
    <h2>O que voce precisa para usar?</h2>
    <p>atualmente esse bot nao esta em um servidor dedicado
        entao voce deve ter o node.js instalada na sua maquina
        para roda-lo <a href="https://nodejs.org/en/">(O que è node?)</a>
        junto dele voce vai ter instalado o npm <a href="https://www.npmjs.com/">(O que è npm?)</a>
        segue abaixo o passo a passo:
    </p>
    <h3>Node</h3>
    <ol style="list-style-type: lower-roman;">
        <li>
            node Version: 16^
        </li>
        <li>
            ir na pasta onde voce baixou esses arquivos
        </li>
        <li>
            abra o seu terminal DENTRO da pasta
        </li>
        <li>
            escreva no terminal "npm install"
        </li>
    </ol>
    <h3>Discord</h3>
    <h4 style="margin: 0;">hablitando o modo de desenvolvedor</h4>
    <p>com a parte de node devidamente terminada, faça:</p>
    <ol style="list-style-type: lower-roman; border: 1px solid black;">
        <li>abra o discord</li>
        <li>abra o discord / va em configuração (ao lado dos eu nome)</li>
        <li>abra o discord / va em configuração / va em avançado</li>
        <li>abra o discord / va em configuração / va em avançado -> ative o "Modo do desenvolvedor"</li>
        <li>acesse <a href="https://discord.com/developers/applications/">esse link</a></li>
        <li>va no canto superior direito e procure por "New Application"
            e siga o passo a passo
        </li>
        <li>voce vai ter uma nova aba com novas opções procure por: "Bot"
        </li>
        <li>clique em rigitsrar bot</li>
        <li>copie o token -> va no arquivo baixado "ConfigNew.json" -> cole na key: "token"</li>
        <li>va no server onde voce vai usar o bot e clique com o botão direito</li>
        <li>copie o id</li>
        <li>cole em guildId</li>
        <li>volte no navegador e copie a "Application ID"</li>
        <li>cole na key clientId</li>
    </ol>
    <h4>Criando comandos e personalizando o bot</h4>
    <ul>
        <li>dentro do arquivo "deploy_commands.js" voce pode criar novos comando
            <a href="https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script">Veja
                aqui como</a>
        </li>
    </ul>
    <p>se voce chegou ate aqui sem se perder (caso to tenha me contate)
        agora va na pasta dos arquivos execute um terminal ali (sempre certifique-se que voce esta na pasta dos arquivos
        no terminal)
        e execute o comando node index.js se tudo der certo voce pode usar o comando
        /server e se receber informações de volta tudo ocrooreu bem
    </p>
</section>