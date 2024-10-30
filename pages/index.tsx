import type { NextPage } from "next";
import Link from "next/link";
import CustomPhoneInput from "../components/CustomPhoneInput/CustomPhoneInput";
import { useToggle } from "../hooks/useToggle";

const Home: NextPage = () => {
  const [openMenu, setOpenMenu] = useToggle(true);
  const [openModal, setModal] = useToggle(true);
  return (
    <div>
      Menu {openMenu ? 'Is Opend' : 'Is Closed'}
      <button onClick={setOpenMenu}>Toggle Menu</button>

      <br/>
      Modal {openModal ? 'Is Opend' : 'Is Closed'}
      <button onClick={setModal}>Toggle setModal</button>
      <ul>
        <li>
          <Link href="/server">
            <a className="title" >Server side</a>
          </Link>
        </li>
        <li>
          <Link href="/client">
            <a>Client side</a>
          </Link>
        </li>
        <li>
          <Link href="/static">
            <a>Static</a>
          </Link>
        </li>
      </ul>
      <CustomPhoneInput />

    </div>
  );
};

export default Home;
