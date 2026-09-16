/**
 * Política de privacidade do Naiah — exigida pela Google Play para apps que
 * lidam com dados de saúde.
 *
 * Cada afirmação aqui corresponde ao que o código faz, e é verificável:
 * o app não tem backend, não faz nenhuma chamada de rede e o banco é
 * SQLCipher com a chave no Android Keystore. Se o app mudar, esta página
 * muda junto — uma política que promete mais do que o código entrega é pior
 * do que não ter política.
 */

const UPDATED = "16 de setembro de 2026"
const CONTACT = "adrianwidmer2@gmail.com"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-neutral-700">{children}</div>
    </section>
  )
}

export default function NaiahPrivacidade() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-14 md:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
        Naiah · Política de Privacidade
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
        Seus dados não saem do seu celular.
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
        O Naiah é um app de rastreio de ciclo menstrual <strong>local-first</strong>. Não existe
        conta, não existe servidor e não existe nenhuma cópia dos seus dados fora do seu aparelho.
        Isso não é uma promessa de intenção: o app não tem backend nenhum para onde enviar dados.
      </p>
      <p className="mt-2 text-sm text-neutral-500">Última atualização: {UPDATED}</p>

      <Section title="Resumo">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Nenhum dado é coletado, enviado, vendido ou compartilhado.</li>
          <li>Não há cadastro, login, e-mail ou identificador de usuária.</li>
          <li>Tudo fica gravado criptografado no próprio aparelho.</li>
          <li>Não há anúncios, rastreadores, analytics ou ferramentas de terceiros.</li>
          <li>Desinstalar o app apaga todos os dados.</li>
        </ul>
      </Section>

      <Section title="O que o app guarda">
        <p>Somente o que você registra, e somente no seu aparelho:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Datas de início e fim da menstruação.</li>
          <li>
            Registros de relação sexual: data, se houve proteção, método usado e, se você quiser,
            apelidos de quem participou.
          </li>
          <li>Humor, sintomas e anotações do dia.</li>
          <li>Suas preferências do app (idioma, tema, lembretes, método contraceptivo contínuo).</li>
        </ul>
        <p>
          O app também calcula previsões (próxima menstruação, janela fértil, nível de fertilidade) a
          partir desses registros. Esse cálculo acontece inteiramente dentro do aparelho.
        </p>
      </Section>

      <Section title="Onde esses dados ficam">
        <p>
          Num banco de dados <strong>criptografado (SQLCipher)</strong> dentro da área privada do app
          no seu celular. A chave de criptografia é gerada no seu aparelho e guardada no cofre do
          sistema (Android Keystore) — ela não aparece no app, não é escolhida por você e não sai
          dali.
        </p>
        <p>
          Na prática: se alguém copiar o arquivo do banco para fora do celular, o conteúdo é
          ilegível sem a chave.
        </p>
      </Section>

      <Section title="O que o app não faz">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Não envia seus dados para lugar nenhum — não há servidor.</li>
          <li>Não usa analytics, telemetria, crash reporting ou SDK de terceiros.</li>
          <li>Não exibe anúncios nem faz perfilamento.</li>
          <li>Não vende nem compartilha dados com ninguém, em nenhuma hipótese.</li>
          <li>Não junta seus dados com os de outras pessoas.</li>
        </ul>
      </Section>

      <Section title="Permissões do Android">
        <p>
          O Android lista as permissões que um app declara, e algumas aparecem por serem padrão da
          tecnologia usada (React Native / Expo), mesmo sem uso real. Para ser transparente:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Câmera</strong> — usada apenas para ler o QR code na transferência entre
            celulares. Nenhuma imagem é salva ou enviada.
          </li>
          <li>
            <strong>Notificações</strong> — lembretes locais, gerados no próprio aparelho. Não há
            notificações push vindas de servidor.
          </li>
          <li>
            <strong>Biometria / digital</strong> — apenas para o bloqueio opcional do app, validado
            pelo sistema.
          </li>
          <li>
            <strong>Vibração</strong> — retorno tátil ao registrar.
          </li>
          <li>
            <strong>Armazenamento</strong> — apenas para você salvar e escolher o arquivo de backup.
          </li>
          <li>
            <strong>Internet e estado da rede</strong> — declaradas por padrão pelo framework. O app
            não faz nenhuma requisição de rede; ele funciona igual em modo avião.
          </li>
        </ul>
      </Section>

      <Section title="Backup e transferência entre celulares">
        <p>
          As duas únicas formas de um dado sair do aparelho são iniciadas por você, manualmente:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Backup</strong> — gera um arquivo criptografado com uma senha que você escolhe.
            Você decide onde guardar. Sem essa senha, o arquivo não pode ser aberto — nem por mim.
          </li>
          <li>
            <strong>Transferência por QR code</strong> — copia seus dados para outro celular por QR
            codes na tela, criptografados, sem internet e sem intermediário.
          </li>
        </ul>
        <p>
          Em ambos os casos o destino é escolhido por você. Nenhum dos dois passa por qualquer
          serviço ou servidor.
        </p>
      </Section>

      <Section title="Como apagar tudo">
        <p>
          Em <strong>Ajustes → Apagar todos os dados</strong>, ou simplesmente desinstalando o app.
          Como não existe cópia em servidor, não sobra nada em lugar nenhum. Não é preciso pedir
          exclusão a ninguém.
        </p>
      </Section>

      <Section title="Menores de idade">
        <p>
          O app não coleta dados de ninguém, de nenhuma idade — não há cadastro nem identificação de
          quem usa.
        </p>
      </Section>

      <Section title="Sobre o aviso de saúde">
        <p>
          O Naiah estima probabilidades a partir do seu histórico e comunica incerteza de propósito.{" "}
          <strong>
            Fertilidade por calendário não é método contraceptivo: falha para cerca de 12 em cada 100
            pessoas por ano e não protege contra ISTs.
          </strong>{" "}
          O app não substitui avaliação de profissional de saúde.
        </p>
      </Section>

      <Section title="Mudanças nesta política">
        <p>
          Se o funcionamento do app mudar de um jeito que afete esta página, ela é atualizada e a
          data no topo muda junto.
        </p>
      </Section>

      <Section title="Contato">
        <p>
          Dúvidas sobre privacidade ou sobre o app:{" "}
          <a className="underline underline-offset-4" href={`mailto:${CONTACT}`}>
            {CONTACT}
          </a>
          .
        </p>
      </Section>
    </main>
  )
}
