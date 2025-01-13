import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Label } from '../../components/Label/Label';
import { Input } from '../../components/Input/Input';
import styles from './cadastro.module.css';

export function CadastroPage() {
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formValues.senha !== formValues.confirmaSenha) {
      alert('As senhas não correspondem.');
      return;
    }

    try {
      const response = await api.post('/administrador', formValues);
      console.log('Cadastro realizado com sucesso.', response.data);
      alert('Cadastro concluído com êxito!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar usuário.', error);
      alert('O e-mail informado já está registrado.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Registre-se</h1>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <Label label="Nome Completo" tagInput="nome" />
          <Input
            id="nome"
            name="nome"
            type="text"
            placeholder="Informe seu nome completo"
            value={formValues.nome}
            onChange={handleInputChange}
          />
          <Label label="E-mail" tagInput="email" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu endereço de e-mail"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <Label label="Senha" tagInput="senha" />
          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="Crie uma senha"
            value={formValues.senha}
            onChange={handleInputChange}
          />
          <Label label="Confirme a Senha" tagInput="confirmaSenha" />
          <Input
            id="confirmaSenha"
            name="confirmaSenha"
            type="password"
            placeholder="Repita a senha criada"
            value={formValues.confirmaSenha}
            onChange={handleInputChange}
          />
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
              <i className="fas fa-arrow-left"></i> Voltar
            </button>
            <button type="submit" className={styles.button}>
              <i className="fas fa-user-plus"></i> Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
