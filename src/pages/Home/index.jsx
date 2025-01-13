import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { api } from "../../services/api";

export function HomePage() {
  const [eventos, setEventos] = useState([]);
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [eventoAtual, setEventoAtual] = useState(null);
  const [novoEvento, setNovoEvento] = useState({
    nome: "",
    dataEvento: "",
    localizacao: "",
    imagem: "",
  });
  const [edicaoEvento, setEdicaoEvento] = useState({
    nome: "",
    dataEvento: "",
    localizacao: "",
  });

  useEffect(() => {
    api
      .get("/evento")
      .then((response) => {
        const eventosOrdenados = response.data.sort((a, b) => {
          const dataA = new Date(a.dataEvento);
          const dataB = new Date(b.dataEvento);
          return dataA - dataB;
        });
        setEventos(eventosOrdenados);
      })
      .catch((error) => {
        console.error("Erro ao carregar eventos.", error);
      });
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!novoEvento.nome || !novoEvento.dataEvento || !novoEvento.localizacao) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", novoEvento.nome);
      formData.append("dataEvento", novoEvento.dataEvento);
      formData.append("localizacao", novoEvento.localizacao);
      formData.append("imagem", novoEvento.imagem);

      const response = await api.post("/evento", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEventos([...eventos, response.data]);

      setNovoEvento({
        nome: "",
        dataEvento: "",
        localizacao: "",
        imagem: null,
      });
      setModalAdicionar(false);
      alert("Evento adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar evento.", error);
      alert("Ocorreu um erro ao adicionar o evento.");
    }
  };

  const abrirModalEditar = (evento) => {
    setEventoAtual(evento);
    setEdicaoEvento({
      nome: evento.nome,
      dataEvento: evento.dataEvento,
      localizacao: evento.localizacao,
    });
    setModalEditar(true);
  };

  const handleEditEvento = async (e) => {
    e.preventDefault();

    if (!edicaoEvento.nome || !edicaoEvento.dataEvento || !edicaoEvento.localizacao) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const updateEvento = { ...edicaoEvento };

      await api.put(`/evento/${eventoAtual.id}`, updateEvento);

      setEventos((prev) =>
        prev.map((evento) =>
          evento.id === eventoAtual.id ? { ...evento, ...updateEvento } : evento
        )
      );

      setModalEditar(false);
      alert("Evento editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar evento.", error);
      alert("Ocorreu um erro ao editar o evento.");
    }
  };

  const handleDeleteEvento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) {
      return;
    }

    try {
      await api.delete(`/evento/${id}`);
      setEventos(eventos.filter((evento) => evento.id !== id));
      alert("Evento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar evento.", error);
      alert("Ocorreu um erro ao deletar o evento.");
    }
  };

  function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }
  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.button_adicionar}
          onClick={() => setModalAdicionar(true)}
        >
          <i className="fas fa-plus"></i>
          ADICIONAR EVENTO
        </button>
        <div className={styles.list}>
          {eventos.map((evento) => (
            <div key={evento.id} className={styles.item}>
              <div className={styles.conteudo}>
                <div className={styles.imagem}>
                  <img
                    src={`http://localhost:8080/images/${evento.imagem}`}
                    alt="imagem do evento"
                  />
                </div>
                <div className={styles.data}>
                  <p>{formatarData(evento.dataEvento)}</p>
                </div>
                <p className={styles.titulo}>{evento.nome}</p>
                <div className={styles.endereco_div}>
                  <p className={styles.endereco}>Endereço:</p>
                  <p>{evento.localizacao}</p>
                </div>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.button_excluir}
                  onClick={() => handleDeleteEvento(evento.id)}
                >
                  <i className="fas fa-trash"></i>
                  Excluir
                </button>
                <button
                  className={styles.button_editar}
                  onClick={() => abrirModalEditar(evento)}
                >
                  <i className="fas fa-edit"></i>
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>

        {modalAdicionar && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <button
                className={styles.closeButton}
                onClick={() => setModalAdicionar(false)}
              >
                &times;
              </button>
              <h2>Criar Novo Evento</h2>
              <form onSubmit={handleAddEvent} className={styles.form}>
                <Input
                  tagInput="nome"
                  type="text"
                  placeholder="Nome do Evento"
                  value={novoEvento.nome}
                  onChange={(e) =>
                    setNovoEvento({ ...novoEvento, nome: e.target.value })
                  }
                />
                <Input
                  tagInput="data"
                  type="date"
                  value={novoEvento.dataEvento}
                  onChange={(e) =>
                    setNovoEvento({
                      ...novoEvento,
                      dataEvento: e.target.value,
                    })
                  }
                />
                <Input
                  tagInput="local"
                  type="text"
                  placeholder="Local do Evento"
                  value={novoEvento.localizacao}
                  onChange={(e) =>
                    setNovoEvento({
                      ...novoEvento,
                      localizacao: e.target.value,
                    })
                  }
                />
                <input
                  type="file"
                  onChange={(e) =>
                    setNovoEvento({ ...novoEvento, imagem: e.target.files[0] })
                  }
                />
                <div className={styles.botoes}>
                  <button
                    type="button"
                    onClick={() => setModalAdicionar(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {modalEditar && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <button
                className={styles.closeButton}
                onClick={() => setModalEditar(false)}
              >
                &times;
              </button>
              <h2>Editar Evento</h2>
              <form onSubmit={handleEditEvento} className={styles.form}>
                <Input
                  tagInput="nome"
                  type="text"
                  placeholder="Nome do Evento"
                  value={edicaoEvento.nome}
                  onChange={(e) =>
                    setEdicaoEvento({
                      ...edicaoEvento,
                      nome: e.target.value,
                    })
                  }
                />
                <Input
                  tagInput="data"
                  type="date"
                  value={edicaoEvento.dataEvento}
                  onChange={(e) =>
                    setEdicaoEvento({
                      ...edicaoEvento,
                      dataEvento: e.target.value,
                    })
                  }
                />
                <Input
                  tagInput="local"
                  type="text"
                  placeholder="Local do Evento"
                  value={edicaoEvento.localizacao}
                  onChange={(e) =>
                    setEdicaoEvento({
                      ...edicaoEvento,
                      localizacao: e.target.value,
                    })
                  }
                />
                <div className={styles.botoes}>
                  <button
                    type="button"
                    onClick={() => setModalEditar(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
