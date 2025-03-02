BEGIN;


CREATE TABLE IF NOT EXISTS public.persona
(
    id_persona serial NOT NULL,
    nombre text NOT NULL,
    documento text NOT NULL,
    celular text,
    edad smallint NOT NULL,
    sexo text NOT NULL,
    PRIMARY KEY (id_persona),
    CONSTRAINT unique_documento UNIQUE (documento)
);

CREATE TABLE IF NOT EXISTS public.municipio
(
    id_municipio serial NOT NULL,
    nombre text NOT NULL,
    area integer NOT NULL,
    altitud integer NOT NULL,
    PRIMARY KEY (id_municipio)
);

CREATE TABLE IF NOT EXISTS public.vivienda
(
    id_vivienda serial NOT NULL,
    direccion text NOT NULL,
    capacidad integer NOT NULL,
    niveles integer NOT NULL,
    PRIMARY KEY (id_vivienda)
);

CREATE TABLE IF NOT EXISTS public.trabajo
(
    id_trabajo serial NOT NULL,
    cargo text NOT NULL,
    empresa text NOT NULL,
    salario integer NOT NULL,
    id_persona integer NOT NULL,
    PRIMARY KEY (id_trabajo)
);

ALTER TABLE IF EXISTS public.trabajo
    ADD FOREIGN KEY (id_persona)
    REFERENCES public.persona (id_persona) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS public.dependiente
(
    id_cabeza_familia serial NOT NULL,
    id_dependiente serial NOT NULL,
    CONSTRAINT pk_dependientes PRIMARY KEY (id_cabeza_familia, id_dependiente),
    CONSTRAINT unique_dependiente UNIQUE (id_dependiente)
);

CREATE TABLE IF NOT EXISTS public.reside
(
    id_persona serial NOT NULL,
    id_vivienda serial NOT NULL,
    PRIMARY KEY (id_persona, id_vivienda),
    CONSTRAINT unique_residente UNIQUE (id_persona)
);

CREATE TABLE IF NOT EXISTS public.ubicado_en
(
    id_vivienda serial NOT NULL,
    id_municipio serial NOT NULL,
    PRIMARY KEY (id_vivienda, id_municipio),
    CONSTRAINT unique_id_vivienda UNIQUE (id_vivienda)
);

CREATE TABLE IF NOT EXISTS public.gobierna
(
    id_municipio serial NOT NULL,
    id_persona serial NOT NULL,
    PRIMARY KEY (id_municipio, id_persona),
    CONSTRAINT unique_municipio UNIQUE (id_municipio),
    CONSTRAINT unique_gobernante UNIQUE (id_persona)
);

CREATE TABLE IF NOT EXISTS public.propietario
(
    id_persona serial NOT NULL,
    id_vivienda serial NOT NULL,
    PRIMARY KEY (id_persona, id_vivienda)
);

ALTER TABLE IF EXISTS public.dependiente
    ADD FOREIGN KEY (id_cabeza_familia)
    REFERENCES public.persona (id_persona) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.dependiente
    ADD FOREIGN KEY (id_dependiente)
    REFERENCES public.persona (id_persona) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.reside
    ADD FOREIGN KEY (id_persona)
    REFERENCES public.persona (id_persona) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.reside
    ADD FOREIGN KEY (id_vivienda)
    REFERENCES public.vivienda (id_vivienda) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.ubicado_en
    ADD FOREIGN KEY (id_vivienda)
    REFERENCES public.vivienda (id_vivienda) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.ubicado_en
    ADD FOREIGN KEY (id_municipio)
    REFERENCES public.municipio (id_municipio) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.gobierna
    ADD FOREIGN KEY (id_municipio)
    REFERENCES public.municipio (id_municipio) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.gobierna
    ADD FOREIGN KEY (id_persona)
    REFERENCES public.persona (id_persona) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.propietario
    ADD FOREIGN KEY (id_persona)
    REFERENCES public.persona (id_persona) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.propietario
    ADD FOREIGN KEY (id_vivienda)
    REFERENCES public.vivienda (id_vivienda) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;

END;